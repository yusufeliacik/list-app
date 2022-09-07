import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { SelectBox } from "../../components";
import { Button } from "../../components/Button";

type Props = {
  setVisible: () => void;
  optionsSelect?: Array<{ label: string; value: string }>;
  onEdit: (value: string) => void;
  defaultValue?: string;
};

export const EditJobModal: FC<Props> = ({
  setVisible,
  optionsSelect,
  onEdit,
  defaultValue,
}) => {
  const [priority, setPriority] = useState("");
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
          options={optionsSelect}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button text="edit" onClick={() => onEdit(priority)} />
      </Modal.Footer>
    </Modal>
  );
};
