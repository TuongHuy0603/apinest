import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { IUser } from 'src/users/users.interface';
import { name } from 'ejs';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(data: CreateCompanyDto, user: IUser) {
    let company = await this.companyModel.create({
      ...data,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return company;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    console.log('zxcc', offset);
    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: { _id: user._id, email: user.email },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'user not found';
    }

    await this.companyModel.updateOne(
      {
        _id: id,
      },
      { deletedBy: { _id: user._id, email: user.email } },
    );

    return await this.companyModel.softDelete({
      _id: id,
    });
  }
}
