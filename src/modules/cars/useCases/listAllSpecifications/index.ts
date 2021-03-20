import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListAllSpecificationsController } from "./ListAllSpecificationsController";
import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();
const listAllSpecificationsUseCase = new ListAllSpecificationsUseCase(specificationsRepository);
export const listAllSpecificationsController = new ListAllSpecificationsController(listAllSpecificationsUseCase);
