export class PixPayload {
    constructor(key, name, city, amount, txid) {
        this.key = key;
        this.name = this.clean(name, 25);
        this.city = this.clean(city, 15);
        this.amount = amount ? amount.toFixed(2) : null;
        this.txid = this.clean(txid, 25) || '***';
    }

    clean(str, max) {
        if (!str) return '';
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return str.substring(0, max).toUpperCase();
    }

    format(id, value) {
        const len = value.length.toString().padStart(2, '0');
        return `${id}${len}${value}`;
    }

    crc16(str) {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
                else crc = crc << 1;
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    }

    generate() {
        let payload = '000201';
        let gui = this.format('00', 'br.gov.bcb.pix');
        let key = this.format('01', this.key);
        payload += this.format('26', gui + key);
        payload += this.format('52', '0000');
        payload += this.format('53', '986');
        if (this.amount) payload += this.format('54', this.amount);
        payload += this.format('58', 'BR');
        payload += this.format('59', this.name || 'RECEBEDOR');
        payload += this.format('60', this.city || 'BRASIL');
        let txidProp = this.format('05', this.txid);
        payload += this.format('62', txidProp);
        payload += '6304';
        payload += this.crc16(payload);
        return payload;
    }
}
