import { FC, useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import './Input.css';

interface dataType {
  id?: number;
  writer?: string;
  description?: string;
}

const write = gql`
  mutation write($writer: String!, $description: String!) {
    write(writer: $writer, description: $description)
  }
`;

const Input: FC = () => {
  const [writeData, setWriteData] = useState<dataType>({
    writer: '',
    description: '',
  });

  const [writer, setWirter] = useState<string>('');

  const [addMessage, { data }] = useMutation(write);

  const handleData = (info: dataType) => {
    setWriteData({ ...writeData, ...info });
  };

  useEffect(() => {
    console.log(writeData);
  }, [writeData]);

  return (
    <div className='input-container'>
      {writeData.writer ? (
        <>
          <input
            type='text'
            value={writeData.description}
            placeholder='Please input your message'
            onChange={(e) => {
              handleData({ description: e.target.value });
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addMessage({ variables: { ...writeData } });
                handleData({ description: '' });
              }
            }}
          />
          <button
            onClick={() => {
              addMessage({ variables: { ...data } });
              handleData({ description: '' });
            }}
          >
            send
          </button>
        </>
      ) : (
        <input
          type='text'
          placeholder='Please input your name first'
          value={writer}
          onChange={(e) => {
            setWirter(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              handleData({ writer: writer });
            }
          }}
        />
      )}
    </div>
  );
};
export default Input;
