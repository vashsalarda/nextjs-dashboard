import styles from '@/app/(ui)/home.module.css';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default function Page() {
  return <p className={styles.header}>Customers Page</p>;
}