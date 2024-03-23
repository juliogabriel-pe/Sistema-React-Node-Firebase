import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  import api from "../Services/api";
  
  const EditComp = ({ data, setData, isOpen, onClose, id }) => {
    const [Nome, setNome] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [Segmento, setSegmento] = useState("");
    const [CEP, setCEP] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Numero, setNumero] = useState("");
    const [Bairro, setBairro] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Estado, setEstado] = useState("");
  
    const handleEdit = async () => {
      if (!Nome || !CNPJ || !Segmento || !CEP || !Endereco || !Numero || !Bairro || !Cidade || !Estado ) return;
  
      try {
        // Enviar os dados para o backend usando Axios
        await api.delete(`delete/${id}`);
        await axios.post("http://localhost:4000/create", { Nome, CNPJ, Segmento, CEP, Endereco, Numero, Bairro, Cidade, Estado });
  
        // Fechar o modal
        onClose();
        window.location.reload()
        // criar um Toast.sucessuful
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        // Tratar o erro de alguma forma apropriada, como exibir uma mensagem para o usuário
      }
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Atualizar de Clientes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={Nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>CNPJ</FormLabel>
                  <Input
                    type="CNPJ"
                    value={CNPJ}
                    onChange={(e) => setCNPJ(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Segmento da Empresa</FormLabel>
                  <Input
                    type="Segmento"
                    value={Segmento}
                    onChange={(e) => setSegmento(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    type="CEP"
                    value={CEP}
                    onChange={(e) => setCEP(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Endereço</FormLabel>
                  <Input
                    type="Endereco"
                    value={Endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Número</FormLabel>
                  <Input
                    type="Numero"
                    value={Numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Bairro</FormLabel>
                  <Input
                    type="Bairro"
                    value={Bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    type="Cidade"
                    value={Cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="Estado"
                    value={Estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </Box>
              </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleEdit}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  export default EditComp;