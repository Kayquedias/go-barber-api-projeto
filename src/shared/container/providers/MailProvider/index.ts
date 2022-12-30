import { container } from 'tsyringe'

import MailProvider from './implementations/MailProvider'
import IMailProvider from './models/IMailProvider'

container.registerSingleton<IMailProvider>('MailProvider', MailProvider)
