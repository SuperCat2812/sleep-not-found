import Image from 'next/image';
import styles from './BabyTodayCard.module.css';

type BabyTodayCardProps = {
  imageUrl: string;
  size: string;
  weight: string;
  activity: string;
  description: string;
};

const BabyTodayCard = ({
  imageUrl,
  size,
  weight,
  activity,
  description,
}: BabyTodayCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Малюк сьогодні</h2>
      <div className={styles.mediaRow}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt="Малюк"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.infoList}>
          {size && size !== '0' && (
            <p className={styles.infoItem}>
              <strong>Розмір:</strong>{' '}
              <span className={styles.infoValue}>{size}</span>
            </p>
          )}
          {weight && weight !== '0' && (
            <p className={styles.infoItem}>
              <strong>Вага:</strong>{' '}
              <span className={styles.infoValue}>{weight}</span>
            </p>
          )}
          <p className={styles.infoItem}>
            <strong>Активність:</strong>{' '}
            <span className={styles.infoValue}>{activity}</span>
          </p>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default BabyTodayCard;
