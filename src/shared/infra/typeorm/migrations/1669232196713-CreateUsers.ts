import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1669232196713 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table ({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar'
            },
            {
              name: 'password',
              type: 'varchar'
            },
            {
              name: 'created_At',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_At',
              type: 'timestamp',
              default: 'now()'
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('users')
    }

}
