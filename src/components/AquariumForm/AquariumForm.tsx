import styles from './AquariumForm.module.css';

export default function AquariumForm() {
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Volume (Liters):
        <input 
          type="number" 
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
}