interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, handleClose, children }: Props) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white relative w-6/12 h-auto p-12 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-5 right-5" onClick={handleClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
