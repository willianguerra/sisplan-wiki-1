import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Search } from "./SearchComponent";
interface ModalSearchProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function ModalSearch({ isOpen, onRequestClose }: ModalSearchProps) {
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} size="lg">
      <ModalOverlay />
      <ModalContent padding={0} border="none" bg="var(--background-Color)">
        <ModalBody padding={0}>
          <Search onCloseModal={onRequestClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
