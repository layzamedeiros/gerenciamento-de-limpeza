import { Header } from "@components/Header";
import { Button, ButtonText, Container, Content, StyledScroll,  } from "./styles";
import React from "react";
import { CardEmployees } from "@components/CardEmployees";
import { PlusIcon } from "phosphor-react-native";

export function ManageEmployee() {
  return(
    <Container>
      <Header title="Gerenciar Funcionários"/>
      <Content>
        <Button>
          <PlusIcon color="white" size={24} />
          <ButtonText>Cadastrar novo Funcionário</ButtonText>
        </Button>
        <StyledScroll>
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardEmployees 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
        </StyledScroll>
      </Content>
    </Container>
  )
}