'use client';

interface ErrorProps {
  error: Error;
}

function NoteIdError({ error }: ErrorProps) {
  return (
    <p
      style={{
        display: 'flex',
        fontFamily: 'var(--font-comfortaa)',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        fontSize: '18px',
        fontWeight: 500,
        marginTop: '32px',
      }}
    >
      Щось пішло не так. Причина: {error.message}
    </p>
  );
}

export default NoteIdError;
