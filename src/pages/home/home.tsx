import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryButton from "../../shared/components/PrimaryButton/PrimaryButton";
import Text from "../../shared/components/Text/Text";
import Title from "../../shared/components/Title/Title";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2% 4%;
  gap: 2%;
`;

const DivContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding-top: 40px;
`;

const DivLogin = styled.div`
  width: 550px;
  height: 500px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

const Link = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

export function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await auth.authenticate(data.matricula, data.senha);

      if (res.token) {
        navigate("/alunos");
      }
    } catch (error) {
      toast.error("Não foi possível entrar, verifique as credenciais!");
    }
  };

  return (
    <div>
      <Container>
        <DivContent>
          <Title fontSize={28} fontWeight={400}>
            Projeto de Laboratórios Remotos
          </Title>
          <Text fontSize={18} fontWeight={400}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for lorem ipsum will uncover many web sites
            still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
        </DivContent>
        <DivContent>
          <DivLogin>
            <Title fontSize={24} fontWeight={500}>
              Acesse sua conta
            </Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-matricula"
                label="Matricula"
                required={true}
                {...register("matricula")}
                sx={{ width: "60%", background: "#F5F4FF" }}
              />
              <FormControl
                sx={{ width: "60%", background: "#F5F4FF" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  {...register("senha")}
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword ? (
                        <AiFillEyeInvisible
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          cursor="pointer"
                          size={20}
                        />
                      ) : (
                        <AiFillEye
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          cursor="pointer"
                          size={20}
                        />
                      )}
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Link>Não possui conta? Cadastre-se</Link>
              <Link>Esqueceu sua senha?</Link>
              <PrimaryButton>Entrar</PrimaryButton>
            </Form>
          </DivLogin>
        </DivContent>
      </Container>
    </div>
  );
}
