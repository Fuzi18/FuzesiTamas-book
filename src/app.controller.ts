import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { KonyvDTO } from './konyv.dto';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async konyvlista(@Query('kereses') kereses) {
    if (kereses != null) {
      const [eredmeny] = await db.execute(
        'SELECT cim, ertekeles FROM konyv WHERE ertekeles = ?',
        [kereses],
      );

      return { konyv: eredmeny };
    } else {
      const [rows] = await db.execute(
        'SELECT cim, ertekeles FROM konyv ORDER BY ertekeles DESC',
      );
      return { konyv: rows };
    }
  }

  @Get('konyv/uj')
  @Render('konyvhozzaadas')
  addkonyvForm() {
    return {};
  }

  @Post('konyv/uj')
  @Redirect()
  async addkonyv(@Body() konyv: KonyvDTO) {
    const []: any = await db.execute(
      'INSERT INTO `konyv` (`cim`,`ertekeles`) VALUES (?, ?)',
      [konyv.cim, konyv.ertekeles],
    );
    return { url: '/' };
  }
}
