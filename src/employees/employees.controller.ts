import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

class Employee {
  Id: number;
  Name: string;
  Age: string;
  Salary: number;
}

@ApiTags('Employees') 
@Controller('employees')
export class EmployeesController {
  private employees: Employee[] = [
    { Id: 1, Name: 'Ahmed', Age: '30', Salary: 5000 },
    { Id: 2, Name: 'Sara', Age: '28', Salary: 6000 },
    { Id: 3, Name: 'Khaled', Age: '35', Salary: 7000 },
  ];

  @Get()
  @ApiOperation({ summary: 'List all employees' })
  getAll() {
    return this.employees;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  getById(@Param('id') id: string) {
    return this.employees.find(e => e.Id === +id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new employee' })
  @ApiBody({ type: Employee })
  add(@Body() newEmp: Employee) {
    this.employees.push(newEmp);
    return newEmp;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: Employee })
  update(@Param('id') id: string, @Body() updated: Employee) {
    const index = this.employees.findIndex(e => e.Id === +id);
    if (index > -1) {
      this.employees[index] = updated;
      return updated;
    }
    return { error: 'Employee not found' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiParam({ name: 'id', type: 'number' })
  delete(@Param('id') id: string) {
    const index = this.employees.findIndex(e => e.Id === +id);
    if (index > -1) {
      const deleted = this.employees.splice(index, 1);
      return deleted[0];
    }
    return { error: 'Employee not found' };
  }

  @Get('/highest/salary')
  @ApiOperation({ summary: 'Get highest paid employee' })
  getHighest() {
    return this.employees.reduce((prev, curr) =>
      prev.Salary > curr.Salary ? prev : curr
    );
  }
}

