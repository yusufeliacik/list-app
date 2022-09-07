import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Button, Input, SelectBox, BasicTable } from "../../components";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { EditJobModal } from "../../containers";

type FormData = {
  job: string;
  priority: string;
};

const JoiSchema = Joi.object({
  job: Joi.string().alphanum().max(70).required().empty(""),
  priority: Joi.string().required(),
});

type ListData = {
  job: string;
  priority: string;
  color: string;
  order: number;
};

const trColor = (param: string) => {
  switch (param) {
    case "Urgent":
      return "red";
    case "Regular":
      return "yellow";
    case "Trivial":
      return "lightGreen";
    default:
      return "white";
  }
};

const order = (param: string) => {
  switch (param) {
    case "Urgent":
      return 1;
    case "Regular":
      return 2;
    case "Trivial":
      return 3;
    default:
      return 0;
  }
};

export const Home = () => {
  const [listData, setListData] = useState<ListData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [itemData, setItem] = useState<ListData>();
  const [priorityTypes, setPriorityTypes] = useState();

  const debouncedValue = useDebounce(searchTerm, 500);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(JoiSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    fetch("/api/priority-types", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => setPriorityTypes(data));
  }, []);

  const onSubmit = (data: FormData) => {
    setListData([
      ...listData,
      { ...data, color: trColor(data.priority), order: order(data.priority) },
    ]);
  };

  const filteredData = () => {
    return debouncedValue
      ? listData.filter((item) => item.job.includes(debouncedValue))
      : listData;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const deleteItem = (index: number) => {
    setListData((current) =>
      current.filter((_, i) => {
        return i !== index;
      })
    );
  };

  const editItem = (index: number) => {
    setVisible(!isVisible);
    setItem(listData[index]);
  };

  const onEdit = (value: string) => {
    let newArr = [...listData];

    let itemIndex;

    listData.map((item, index) => {
      return item === itemData ? (itemIndex = index) : (itemIndex = undefined);
    });

    if (itemIndex !== undefined) {
      newArr[itemIndex].priority = value;
      newArr[itemIndex].color = trColor(value);
    }

    setListData(newArr);
    setItem(undefined);
    setVisible(!isVisible);
  };

  return (
    <div className="px-5 mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="job"
          label="Job"
          errorMessage={errors.job?.message}
          control={control}
          maxLength={70}
        />

        <SelectBox
          name="priority"
          label="Priority"
          options={priorityTypes}
          control={control}
          errorMessage={errors.priority?.message}
        />

        <Button text="CREATE" className="mt-3" />
      </form>
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <h3 className="d-flex">JOB LIST</h3>
          <input placeholder="Search" type="text" onChange={handleChange} />
        </div>
        <BasicTable
          data={filteredData().sort((a, b) => a.order - b.order)}
          editClick={editItem}
          deleteClick={deleteItem}
        />
      </div>
      {isVisible && (
        <EditJobModal
          setVisible={() => setVisible(!isVisible)}
          onEdit={onEdit}
          optionsSelect={priorityTypes}
          defaultValue={itemData?.priority}
        />
      )}
    </div>
  );
};
