import { container } from 'tsyringe'

import HandlebarsMailTemplateProvider from './implementations/HandlebarMailTemplateProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)
