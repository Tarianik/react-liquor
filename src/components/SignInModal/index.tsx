import React from 'react';

import styles from './SignInModal.module.scss';
import btnStyles from '../../scss/button.module.scss';

export const SignInModal = ({
  onClose,
  open,
}: {
  onClose: () => void;
  open: Boolean;
}) => {
  const [emptyField, setEmptyField] = React.useState(false);
  const [valueName, setValueName] = React.useState<string>('');
  const [valuePhone, setValuePhone] = React.useState<string>('');
  const [valueEmail, setValueEmail] = React.useState<string>('');

  const nameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const maskPhone = (e: string) => {
    const value = phoneRef.current!.value.replace(/\D+/g, '');
    const numberLength = 11;

    let result = '';

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += '+';
          break;
        case 1:
          result += ' (';
          break;
        case 4:
          result += ') ';
          break;
        case 7:
          result += '-';
          break;
        case 9:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }

    //phoneRef.current!.value = result;
    return result;
  };

  const validatePhone = (phone: string) => {
    const regexp = /\D+/g;
    const number = phone.replace(regexp, '');
    const isValid = number.length === 11;

    return isValid;
  };

  const validateEmail = (email: string) => {
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return regexp.test(email);
  };

  const onHandleSubmit = (e: React.FormEvent) => {
    if (nameRef.current?.value === '') {
      setEmptyField(true);
      e.preventDefault();
    }
  };

  return open ? (
    <div className={styles.container}>
      <div onClick={() => onClose()} className={styles.formWrapper}>
        <div onClick={(e) => e.stopPropagation()} className={styles.form}>
          <form method="post" onSubmit={onHandleSubmit} action="#" id="form">
            <h1 className={styles.title}>Авторизация</h1>
            <svg
              onClick={onClose}
              className={styles.closeIcon}
              width="30"
              height="30"
              viewBox="0 0 1024 1024"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
                fill=""
              />
              <path
                d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
                fill=""
              />
            </svg>
            <h2>Введите номер телефона</h2>
            <div className={styles.flex}>
              <div
                className={`${styles.form__item} ${
                  emptyField && !phoneRef.current?.value ? styles.error : ''
                }`}
              >
                <div className={styles.formItemContainer}>
                  <input
                    ref={phoneRef}
                    value={valuePhone}
                    onChange={(e) => setValuePhone(maskPhone(e.target.value))}
                    id="form-phone"
                    type="text"
                    name="phone"
                    className={`${styles.form__input} ${
                      valuePhone ? styles['not-empty'] : ''
                    }`}
                  />
                  <label
                    htmlFor="form-phone"
                    className={`${styles.form__label} ${styles['form__label--top']}`}
                  >
                    Телефон
                  </label>
                </div>
                <div
                  className={`${styles.form__label} ${styles['form__label--bottom']}`}
                >
                  Проверьте введённый номер
                </div>
              </div>
              {/* <div
                className={`${styles.form__item} ${
                  emptyField && !emailRef.current?.value ? styles.error : ''
                }`}
              >
                <div className={styles.formItemContainer}>
                  <input
                    ref={emailRef}
                    value={valueEmail}
                    onChange={(e) => setValueEmail(e.target.value)}
                    id="form-email"
                    type="text"
                    name="email"
                    className={styles.form__input}
                  />
                  <label
                    htmlFor="form-email"
                    className={`${styles.form__label} ${styles['form__label--top']}`}
                  >
                    Эл. почта
                  </label>
                </div>
                <div
                  className={`${styles.form__label} ${styles['form__label--bottom']}`}
                >
                  Проверьте введённый email
                </div>
              </div> */}
            </div>
            <div className={styles.agreement}>
              Отправляя форму вы соглашаетесь с
              <a href="#"> пользовательским соглашением</a> и
              <a href="#"> политикой конфиденциальности</a>
            </div>
            <button
              type="submit"
              className={`${btnStyles.btn} ${btnStyles.signIn}`}
            >
              Получить код
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
