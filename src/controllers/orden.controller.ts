import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Orden} from '../models';
import {OrdenRepository} from '../repositories';

export class OrdenController {
  constructor(
    @repository(OrdenRepository)
    public ordenRepository: OrdenRepository,
  ) { }

  @post('/ordens')
  @response(200, {
    description: 'Orden model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orden)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {
            title: 'NewOrden',
            exclude: ['id'],
          }),
        },
      },
    })
    orden: Omit<Orden, 'id'>,
  ): Promise<Orden> {
    return this.ordenRepository.create(orden);
  }

  @get('/ordens/count')
  @response(200, {
    description: 'Orden model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Orden) where?: Where<Orden>,
  ): Promise<Count> {
    return this.ordenRepository.count(where);
  }

  @get('/ordens')
  @response(200, {
    description: 'Array of Orden model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orden, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Orden) filter?: Filter<Orden>,
  ): Promise<Orden[]> {
    return this.ordenRepository.find(filter);
  }

  @patch('/ordens')
  @response(200, {
    description: 'Orden PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {partial: true}),
        },
      },
    })
    orden: Orden,
    @param.where(Orden) where?: Where<Orden>,
  ): Promise<Count> {
    return this.ordenRepository.updateAll(orden, where);
  }

  @get('/ordens/{id}')
  @response(200, {
    description: 'Orden model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orden, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Orden, {exclude: 'where'}) filter?: FilterExcludingWhere<Orden>
  ): Promise<Orden> {
    return this.ordenRepository.findById(id, filter);
  }

  @patch('/ordens/{id}')
  @response(204, {
    description: 'Orden PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {partial: true}),
        },
      },
    })
    orden: Orden,
  ): Promise<void> {
    await this.ordenRepository.updateById(id, orden);
  }

  @put('/ordens/{id}')
  @response(204, {
    description: 'Orden PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orden: Orden,
  ): Promise<void> {
    await this.ordenRepository.replaceById(id, orden);
  }

  @del('/ordens/{id}')
  @response(204, {
    description: 'Orden DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenRepository.deleteById(id);
  }
}
