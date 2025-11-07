'use client';

import React from 'react';
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  Pill,
  WaveSeparator
} from '@/components/ui';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-app">
      {/* Hero Section with Gradient */}
      <div className="bg-hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
            Styleguide
          </h1>
          <p className="text-xl text-lilac">
            Demonstração dos componentes e estilos do sistema de design
          </p>
        </div>
      </div>

      <WaveSeparator />
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Typography */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Tipografia</h2>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h1 className="text-4xl font-display text-text mb-2">Heading 1</h1>
                <p className="text-text-secondary">font-display text-4xl</p>
              </div>
              <div>
                <h2 className="text-3xl font-display text-text mb-2">Heading 2</h2>
                <p className="text-text-secondary">font-display text-3xl</p>
              </div>
              <div>
                <h3 className="text-2xl font-display text-text mb-2">Heading 3</h3>
                <p className="text-text-secondary">font-display text-2xl</p>
              </div>
              <div>
                <h4 className="text-xl font-display text-text mb-2">Heading 4</h4>
                <p className="text-text-secondary">font-display text-xl</p>
              </div>
              <div>
                <p className="text-base font-ui text-text mb-2">Texto padrão</p>
                <p className="text-text-secondary">font-ui text-base</p>
              </div>
              <div>
                <p className="text-sm font-ui text-text mb-2">Texto pequeno</p>
                <p className="text-text-secondary">font-ui text-sm</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Cores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorCard color="primary" hex="#6E2BB9" name="Primary" />
            <ColorCard color="primary-dark" hex="#2B0A4A" name="Primary Dark" />
            <ColorCard color="primary-light" hex="#8A4FD0" name="Primary Light" />
            <ColorCard color="secondary" hex="#4A158A" name="Secondary" />
            <ColorCard color="lilac" hex="#D8B4FE" name="Lilac" textDark={true} />
            <ColorCard color="pink-500" hex="#EC4899" name="Pink" />
            <ColorCard color="green-500" hex="#10B981" name="Green" />
            <ColorCard color="red-500" hex="#EF4444" name="Red" />
            <ColorCard color="surface" hex="#FFFFFF" name="Surface" textDark={true} />
            <ColorCard color="border" hex="#E5E7EB" name="Border" textDark={true} />
            <ColorCard color="text" hex="#111827" name="Text" />
            <ColorCard color="text-secondary" hex="#6B7280" name="Text Secondary" />
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Botões</h2>
          <Card>
            <CardHeader>
              <CardTitle>Variantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Botão Primário</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button variant="ghost">Botão Ghost</Button>
                <Button variant="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Tamanhos</h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary" size="sm">Pequeno</Button>
                  <Button variant="primary" size="md">Médio</Button>
                  <Button variant="primary" size="lg">Grande</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Estados</h4>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>Desabilitado</Button>
                  <Button variant="primary" isLoading>Carregando</Button>
                  <Button 
                    variant="primary" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Com ícone
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Inputs</h2>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Padrão</h4>
                <Input 
                  label="Nome" 
                  id="name" 
                  placeholder="Digite seu nome" 
                />
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Com texto de ajuda</h4>
                <Input 
                  label="Email" 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  helperText="Usaremos seu email para contato"
                />
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Com erro</h4>
                <Input 
                  label="Senha" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  error="A senha deve ter pelo menos 6 caracteres"
                />
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Com ícone</h4>
                <Input 
                  label="Pesquisar" 
                  id="search" 
                  placeholder="Digite sua busca" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card com Header</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">
                  Este é um exemplo de card com header. Os cards são usados para agrupar informações relacionadas.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <p className="text-text-secondary">
                  Este é um exemplo de card simples sem header ou footer.
                </p>
              </CardContent>
            </Card>
            
            <Card hover={true}>
              <CardHeader>
                <CardTitle>Card com Hover</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">
                  Este card tem um efeito de hover que aumenta a sombra.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary">Ação</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Card com Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">
                  Este card tem um footer com ações.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancelar</Button>
                <Button variant="primary">Salvar</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Pills */}
        <section>
          <h2 className="text-3xl font-display text-lilac mb-8">Pills</h2>
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Pill variant="primary">Categoria</Pill>
                <Pill variant="success">Ativo</Pill>
                <Pill variant="warning">Pendente</Pill>
                <Pill variant="danger">Cancelado</Pill>
                <Pill variant="info">Informação</Pill>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <WaveSeparator inverted={true} className="mt-16" />
      
      {/* Footer */}
      <footer className="bg-primary-dark py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lilac">
            © 2023 Design System. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Componente auxiliar para exibir cores
function ColorCard({ color, hex, name, textDark = false }) {
  return (
    <div className="flex flex-col">
      <div className={`h-24 rounded-md bg-${color} shadow-soft`}></div>
      <div className="mt-2">
        <p className={`font-medium ${textDark ? 'text-text' : 'text-white'}`}>{name}</p>
        <p className="text-sm text-text-secondary">{hex}</p>
      </div>
    </div>
  );
}