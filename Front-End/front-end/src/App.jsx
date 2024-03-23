import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./CompModel";
import EditComp from "./Components/EditModel";
import api from "../src/Services/api";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure(); // Novo estado para controlar o modal de edição
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get("list");
            setList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`delete/${id}`);
      const newList = list.filter(item => item.id !== id);
      setList(newList);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th>
                  ID
                </Th>
                <Th>
                  Nome
                </Th>
                <Th>
                  CNPJ
                </Th>
                <Th>
                  Segmento
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map(({ id, Nome, CNPJ, Segmento }) => (
                <Tr key={id} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td>{id}</Td>
                  <Td>{Nome}</Td>
                  <Td>{CNPJ}</Td>
                  <Td>{Segmento}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ id, Nome, CNPJ}),
                        onEditOpen(), // Aqui abrimos o modal de edição
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}

      {isEditOpen && (
        <EditComp
          isOpen={isEditOpen}
          onClose={onEditClose} // Fechamos o modal de edição com a função onClose fornecida pelo useDisclosure
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          id={dataEdit.id}
        />
      )}
    </Flex>
  );
};

export default App;
