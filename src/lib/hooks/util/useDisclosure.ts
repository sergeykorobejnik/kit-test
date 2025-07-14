import { useCallback, useState } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = () => setIsOpen(false);
  const onChange = useCallback((value: boolean) => setIsOpen(value), [setIsOpen]);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onOpen,
    onClose,
    onChange,
    onToggle,
  };
};
