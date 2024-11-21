import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-2px);
  border-radius: 2px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-align: center;
`;
const Capacity = styled.div`
  text-align: center;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-align: center;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: center;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const {
    imgsUrl,
    name: cabinName,
    maxCapacity,
    regularPrice,
    discount,
    _id: cabinId,
    description,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      imgsUrl,
      name: `Copy of ${cabinName}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      createdAt: new Date().toJSON(),
    });
  };

  return (
    <TableRow role="row">
      <Img src={imgsUrl?.length ? imgsUrl.at(0) : ""} />
      <Cabin>{cabinName}</Cabin>
      <Capacity>Fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span style={{ textAlign: "center" }}>&minus;</span>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button
              icon={<HiSquare2Stack />}
              onClick={handleDuplicate}
              disabled={isCreating}
            >
              Duplicate
            </Menus.Button>

            <Modal.Open opens="edit-cabin">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete-cabin">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="cabin"
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </TableRow>
  );
}

export default CabinRow;
