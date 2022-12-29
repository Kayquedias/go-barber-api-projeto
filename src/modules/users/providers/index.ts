import { container } from 'tsyringe'

import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', HashProvider)
