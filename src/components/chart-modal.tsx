import { Modal } from "./modal";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChartModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} title="Chart Modal" onClose={onClose}>
      <h1>Chart Modal</h1>
    </Modal>
  );
};
