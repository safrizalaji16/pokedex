export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "/home",
    },
  };
}

export default function Redirect() {}
