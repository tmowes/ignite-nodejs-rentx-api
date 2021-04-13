"use strict";

var _CategoriesRepositoryInMemory = require("../../repositories/inMemory/CategoriesRepositoryInMemory");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createCategoryUseCase;
let categoryRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoryRepositoryInMemory);
  });
  it('should be able to create a new category', async () => {
    const createdCategory = {
      name: 'Category Name Test',
      description: 'Category Description Test'
    };
    await createCategoryUseCase.execute(createdCategory);
    const categoryCreated = await categoryRepositoryInMemory.findByName(createdCategory.name);
    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new category with same name', async () => {
    const createdCategory = {
      name: 'Category Name Test',
      description: 'Category Description Test'
    };
    await createCategoryUseCase.execute(createdCategory);
    await expect(createCategoryUseCase.execute(createdCategory)).rejects.toEqual(new _AppError.default('Category already exists!', 400));
  });
});