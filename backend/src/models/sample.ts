'use strict';
import { Model } from 'sequelize';
import { SampleI } from '../SampleI.interface';
module.exports = (sequelize: any, DataTypes: any) => {
  class sample extends Model<SampleI> implements SampleI {

    id!: string;
    name!: string;
    department!: string;

    static associate(models: any) {}
  };
  sample.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false }
  }, { sequelize, modelName: 'sample' });
  return sample;
};