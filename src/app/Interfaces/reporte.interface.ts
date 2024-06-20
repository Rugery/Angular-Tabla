export interface Reporte {
  PkusrReporte: string;
  FechaReporte: string;
  FkregistroLomb: string;
  FktipoReporte: string;
  oFKTipoReporte: {
    NomTipoReporte: string;
  };
  oConsumoRecursos: ConsumoRecurso[];
  oEventoSistemas: EventoSistema[];
  oLombrizs: Lombriz[];
  oMantenimientos: Mantenimiento[];
  oSustratos: Sustrato[];
  detalleVisible?: boolean;
  detalles: {
    oConsumoRecursos: ConsumoRecurso[];
    oEventoSistemas: EventoSistema[];
    oLombrizs: Lombriz[];
    oMantenimientos: Mantenimiento[];
    oSustratos: Sustrato[];
  };
}

export interface ConsumoRecurso {
    PkConsumo: string;
    CantAguaConsumo: number;
    CantEnergiaConsumo: number;
    DescConsumo: string;
}

export interface EventoSistema {
    PkEvento: string;
    DescEvento: string;
    AccionEvento: string;
    AnomaliaEvento: string;
}

export interface Lombriz {
    PkLombriz: string;
    PesoLombriz: number;
    EspecieLombriz: string;
    LongitudLombriz: number;
    EtapaReprLombriz: string;
}

export interface Mantenimiento {
    PkMantenimiento: string;
    TipoMantenimiento: string;
    DescMantenimiento: string;
}

export interface Sustrato {
    PkSustrato: string;
    PhSustrato: number;
    ComposSustrato: string;
    NivNutSustrato: string;
    TempSustrato: number;
    HumSustrato: number;
}
