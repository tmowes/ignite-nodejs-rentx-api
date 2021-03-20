// eslint-disable-next-line func-names
module.exports = function (plop) {
  plop.setGenerator('usecase', {
    description: 'application usecase logic',
    // inquirer prompts
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'module name?',
      },
      {
        type: 'input',
        name: 'model',
        message: 'model name?',
      },
      {
        type: 'input',
        name: 'repository',
        message: 'repository name?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'useCase name?',
      },
    ],

    // actions to perform
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{camelCase module}}/useCases/{{camelCase name}}/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{camelCase module}}/useCases/{{camelCase name}}/{{pascalCase name}}Controller.ts',
        templateFile: 'templates/controller.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/modules/{{camelCase module}}/useCases/{{camelCase name}}/{{pascalCase name}}UseCase.ts',
        templateFile: 'templates/usecase.ts.hbs',
      },
    ],
  })
}