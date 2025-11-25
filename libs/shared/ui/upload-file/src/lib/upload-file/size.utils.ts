export type TSize = `${number}${'Bytes' | 'KB' | 'MB' | 'GB' | 'TB'}`;

export const formatSize = (bytes: number, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const parseSizeToBytes = (sizeStr: TSize | undefined): number | undefined => {
  if (!sizeStr) {
    return undefined;
  }

  const match = sizeStr.match(/^(\d+)(Bytes|KB|Mb|GB|TB)$/i);
  if (!match) {
    return undefined;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toUpperCase();

  switch (unit) {
    case 'BYTES': {
      return value;
    }

    case 'KB': {
      return value * 1024;
    }

    case 'MB': {
      return value * 1024 * 1024;
    }

    case 'GB': {
      return value * 1024 * 1024 * 1024;
    }

    case 'TB': {
      return value * 1024 * 1024 * 1024 * 1024;
    }

    default: {
      return undefined;
    }
  }
};
