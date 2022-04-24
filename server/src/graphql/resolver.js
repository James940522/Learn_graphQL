import { PubSub } from 'graphql-subscriptions' ;   

import movies from '../database/movies';
import chattingLog from '../database/chattingLog';
import person from '../database/person';

const pubsub = new PubSub();

const NEW_CHAT = 'NEW_CHAT';

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, {id}) => {
      return movies.filter((movie) => movie.id === id)[0];
    },
    chatting: () => chattingLog,
    person: () => person,
  },
  Mutation: {
    addMovie: (_, {name, rating}) => {
      // 영화 제목 중복 검사
      if (movies.find((movie) => movie.name === name)) return null;

      // 데이터베이스에 추가
      const newMovie = {
        id: movies.length + 1,
        name,
        rating,
      };
      movies.push(newMovie);
      return newMovie;
    },
    write: (_, {writer, description}) => {
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description,
      };
      chattingLog.push(newChat); //소스 상단의 채팅 배열(날아감) -> 추후 prisma 추가 필요
      pubsub.publish(NEW_CHAT, {
        newChat,
      });
      return 'YES';
    },
    addPerson: (_, {name, position}) => {
      // 영화 제목 중복 검사
      if (person.find((el) => el.name === name)) return null;

      // 데이터베이스에 추가
      const newPerson = {
        id: person.length + 1,
        name,
        rating,
      };
      person.push(newPerson);
      return newPerson;
    },
  },
  Subscription: {
    newChat: {
      subscribe: () => pubsub.asyncIterator([NEW_CHAT]),
    },
  },
};

export {resolvers, pubsub};
