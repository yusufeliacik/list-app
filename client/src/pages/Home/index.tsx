import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Button, Input, SelectBox, BasicTable } from "../../components";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useSwr from "swr";
import { fetcher } from "../../utils/fetcher";
import { order, trColor } from "./utils";

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

export const Home = () => {
  const [listData, setListData] = useState<ListData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityTypes, setPriorityTypes] = useState();

  const debouncedValue = useDebounce(searchTerm, 500);

  const { data: priorityData } = useSwr("/api/priority-types", fetcher);

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
    if (priorityData) {
      setPriorityTypes(priorityData.data);
    }
  }, [priorityData]);

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

  const onEdit = (index?: number, value?: string) => {
    let newArr = [...listData];

    if (index !== undefined && value) {
      newArr[index].priority = value;
      newArr[index].color = trColor(value);
      newArr[index].order = order(value);
    }

    setListData(newArr);
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
          onEdit={onEdit}
          deleteClick={deleteItem}
        />
      </div>
    </div>
  );
};
