**RF** => Requisitos funcionais
**RNF**=> Requisitos não funcionais
**RN** => Regra de negócio


O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de categorias
**RF**
Deve ser possível cadastrar uma nova categoria.
Deve ser possível listar todas as categorias.
**RN**
Não deve ser possível cadastrar uma categoria com um nome já existente.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de carros
**RF**
Deve ser possível cadastrar um novo carro.
**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado,por padrão, com disponibilidade.

# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.
**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.
**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro.
**RNF**
Utilizar o multer para upload dos arquivos.
**RN**
O usuário deve poder cadastrar mais de uma imagem o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro
**RF**
Deve ser possível realizar um aluguel de carro.
**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
O usuario precisa estar logado.
Precisa colocar o carro como indisponivel até o encerramento do aluguel

# Devolução de carro
**RF**
Deve ser possível finalizar um aluguel de carro.
**RN**
O usuario precisa estar logado.
Se a duração do aluguel for menor de 24 horas, deverá ser cobrado a diária completa.
Caso a data de devolução seja superior a data prevista deverá ser cobrado a multa diária proporcional aos dias de atraso.
O total do aluguel deverá ser calculado, somando a multa se houver
O usuario deverá ser liberado para outro aluguel
O carro deverá ser liberado para outro aluguel
