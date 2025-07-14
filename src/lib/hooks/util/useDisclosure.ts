import { useCallback, useState } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), [isOpen, setIsOpen]);
  const onClose = () => setIsOpen(false);
  const onChange = useCallback((value: boolean) => setIsOpen(value), [isOpen, setIsOpen]);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), [isOpen, setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onOpen,
    onClose,
    onChange,
    onToggle,
  };
};
