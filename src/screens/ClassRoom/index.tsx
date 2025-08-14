import { Header } from "@components/Header";
import { Container, Content, FilterContainer, StyledScroll,  } from "./styles";
import { CardRoom } from "@components/CardRoom";
import React from "react";

export function ClassRoom() {
  return(
    <Container>
      <Header title="Salas de aula"/>
      <Content>
        <FilterContainer>

        </FilterContainer>
        <StyledScroll>
          <CardRoom 
            status="pendente"
            statustitle="Pendente"
            title="Sala Teórica 06"
          />
          <CardRoom 
            status="limpa"
            statustitle="Limpa"
            title="Sala Teórica 06"
          />
          <CardRoom 
            status="limpa"
            statustitle="Limpa"
            title="Sala Teórica 06"
          />
          <CardRoom 
            status="pendente"
            statustitle="Pendente"
            title="Sala Teórica 06"
          />
          <CardRoom 
            status="pendente"
            statustitle="Pendente"
            title="Sala Teórica 06"
          />
          <CardRoom 
            status="limpa"
            statustitle="Limpa"
            title="Sala Teórica 06"
          />
          
        </StyledScroll>
      </Content>
    </Container>
  )
}