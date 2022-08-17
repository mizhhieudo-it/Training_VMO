import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from '../respon-mess.const';

export const DELETE_RESPONSE = {
  respon: ResponSchema(ResponSchemaConst.Schema_Delete, ''),
};
