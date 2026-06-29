import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';
import css from './OnboardingPage.module.css';
import Icon from '@/components/Icon/Icon';

export default function OnboardingPage() {
  return (
    <main className={css.page}>
      <section className={css.card}>
        <Icon className={css.logo} id={'icon-Logo-leleka'} />
        <div className={css.formSide}>
          <OnboardingForm />
        </div>

        <div className={css.imageSide} aria-hidden="true">
          <div className={css.illustration} />
        </div>
      </section>
    </main>
  );
}
