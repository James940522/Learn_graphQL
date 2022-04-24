import { FC, useEffect } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';

const getChatting = gql`
  query {
    chatting {
      id
      writer
      description
    }
  }
`;

const newChat = gql`
  subscription {
    newChat {
      writer
      description
    }
  }
`;

const Home: FC = () => {
  // const { loading, error, data } = useSubscription(newChat);

  const { subscribeToMore, loading, error, data } = useQuery(getChatting);

  // const { loading, error, data } = useSubscription(newChat);
  // const [message, setMessage] = useState(result.data)

  // subscribeToMore({
  //   document: newChat,
  //   updateQuery: (prev, { subscriptionData }) => {
  //     if (!subscriptionData.data) return prev;
  //     const { newChat } = subscriptionData.data;
  //     return {
  //       ...prev,
  //       chatting: [...prev.chatting, newChat],
  //     };
  //   },
  // });

  // useEffect(() => {
  //   subscription();
  // }, []);

  // if (loading) {
  //   return <span>Loading...</span>;
  // }

  // if (error) {
  //   console.error(error);
  //   return <span>Error!</span>;
  // }

  // if (data) {
  // }

  return (
    <div>
      <div>
        {loading
          ? 'Loading...'
          : data.chatting.map((chat: any) => (
              <h3 key={chat.id}>
                {chat.writer}: {chat.description}
              </h3>
            ))}
      </div>
    </div>
  );
};

export default Home;
