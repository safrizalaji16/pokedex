export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "/auth/login",
    },
  };
}

export default function Redirect() {}
