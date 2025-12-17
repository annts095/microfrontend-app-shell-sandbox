import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.homeLink}>
          <span className={styles.homeIcon}>🏠</span>
          <span className={styles.homeText}>Home</span>
        </Link>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}

