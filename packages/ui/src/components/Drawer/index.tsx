import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Button from "../Button";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  position = "left",
  width = "300px",
}: DrawerProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div
        className={`${styles.drawer} ${styles[position]}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className={styles.content}>
          <div className={styles.homeButtonContainer}>
            <Button variant="primary" onClick={handleHomeClick}>
              ホームへ
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
