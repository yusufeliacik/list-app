import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { SelectBox } from "../../components";
import { Button } from "../../components/Button";
import { fetcher } from "../../utils/fetcher";
import useSwr from "swr";

type Props = {
  setVisible: () => void;
  onEdit: (index?: number, value?: string) => void;
  itemIndex: number;
  defaultValue?: string;
};

export const EditJobModal: FC<Props> = ({
  setVisible,
  onEdit,
  defaultValue,
  itemIndex,
}) => {
  const [priority, setPriority] = useState("");
  const { data: priorityData } = useSwr("/api/priority-types", fetcher);

  const onChange = (e: string) => {
    setPriority(e);
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={setVisible}>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <SelectBox
          label="Priority"
          name="priority"
          options={priorityData?.data}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          text="edit"
          onClick={() => {
            onEdit(itemIndex, priority);
            setVisible();
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};
