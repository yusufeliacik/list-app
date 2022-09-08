import { FC, useState } from "react";
import { EditJobModal } from "../../containers";
import { Button } from "../Button";

type Props = {
  data: any[];
  className?: string;
  onEdit: (index?: number, value?: string) => void;
  deleteClick: (index: number) => void;
};

export const BasicTable: FC<Props> = ({
  data,
  className,
  deleteClick,
  onEdit,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [itemIndex, setItemIndex] = useState<number>();

  const editClick = (index: number) => {
    setVisible(true);
    setItemIndex(index);
  };

  return (
    <div>
      <table className={className ?? "table mt-4 border"}>
        <tbody>
          {data.length ? (
            data.map((item, index) => {
              return (
                <tr
                  key={index}
                  style={{ backgroundColor: item.color }}
                  className="align-middle"
                >
                  {Object.entries(item).map(([name, value], index) => {
                    return (
                      name !== "color" &&
                      name !== "order" && (
                        <td key={index}>{value?.toString()}</td>
                      )
                    );
                  })}
                  <td>
                    <Button
                      text="Edit"
                      onClick={() => editClick(index)}
                      className="me-3"
                    />

                    <Button text="Delete" onClick={() => deleteClick(index)} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Result</td>
            </tr>
          )}
        </tbody>
      </table>

      {isVisible && itemIndex !== undefined && (
        <EditJobModal
          setVisible={() => setVisible(!isVisible)}
          onEdit={onEdit}
          itemIndex={itemIndex}
          defaultValue={data[itemIndex].priority}
        />
      )}
    </div>
  );
};
