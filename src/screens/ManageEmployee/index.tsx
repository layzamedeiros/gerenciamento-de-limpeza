import { Header } from "@components/Header";
import { Container, Content, FilterContainer, StyledScroll,  } from "./styles";
import { CardRoom } from "@components/CardRoom";
import React from "react";
import FilterButton from "@components/FilterButton";

export function ManageEmployee() {
  return(
    <Container>
      <Header title="Gerenciar Funcionários"/>
      <Content>
        <StyledScroll>
          <CardRoom 
            title="Maria José"
            subtitle="mariamaria@email.com"
          />
          <CardRoom 
            subtitle="mariamaria@email.com"
            title="Maria josé"
          />
          <CardRoom 
            subtitle="mariamaria@email.com"
            title="Maria josé"
          />
          <CardRoom 
            subtitle="mariamaria@email.com"
            title="Maria josé"
          />
          <CardRoom 
            subtitle="mariamaria@email.com"
            title="Maria josé"
          />
        </StyledScroll>
      </Content>
    </Container>
  )
}