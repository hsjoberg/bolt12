// BOLT #1:
// 1. `tlv_stream`: `n1`
// 2. types:
//    1. type: 1 (`tlv1`)
//    2. data:
//      * [`tu64`:`amount_msat`]
//    1. type: 2 (`tlv2`)
//    2. data:
//      * [`short_channel_id`:`scid`]
//    1. type: 3 (`tlv3`)
//    2. data:
//      * [`point`:`node_id`]
//      * [`u64`:`amount_msat_1`]
//      * [`u64`:`amount_msat_2`]
//    1. type: 254 (`tlv4`)
//    2. data:
//      * [`u16`:`cltv_delta`]
// function toBufferBE(num, width){
//     if (process.browser || converter === undefined) {
//       const hex = num.toString(16);
//       return Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
//     }
//     return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
// }
function towire_tu64(value)
{
    const hex=value.toString(16)
    const buff=Buffer.from(hex.padStart(16, '0').slice(0, 16), 'hex')
    let waste_bytes=0;
    for(let i=0;i<buff.length;i++){
        if(buff[i]===0)waste_bytes++;
        else break;
    }
    return buff.slice(waste_bytes)
}
function fromwire_tu64(buffer)
{
    const untrimmedBuffer = Buffer.alloc(8, 0);
    buffer.copy(untrimmedBuffer, untrimmedBuffer.length - buffer.length);
    var bufInt = (untrimmedBuffer.readUInt32BE(0) << 8) + untrimmedBuffer.readUInt32BE(4);
    console.log(bufInt);
}
// console.log(fromwire_tu64( towire_tu64(100000000)))
// function towire_n1_tlv3(value): Buffer
// {
//     _n = 0
//     // Buffer buf
//     buf = Buffer.concat([buf, towire_point(value[_n++])])
//     buf = Buffer.concat([buf, towire_u64(value[_n++])])
//     buf = Buffer.concat([buf, towire_u64(value[_n++])])
//     assert(value.length() == _n)

//     return buf
// }

// function fromwire_n1_tlv3(buffer): []
// {
//     value = []
//     _n = 0
//     value.push(fromwire_point(buffer))
//     value.push(fromwire_u64(buffer))
//     value.push(fromwire_u64(buffer))
// }

const tlvs_n1 = {
    1: [ "tlv1", towire_tu64, fromwire_tu64 ],
    // 2: [ "tlv2", towire_short_channel_id, fromwire_short_channel_id ],
    // 3: [ "tlv3", towire_n1_tlv3, fromwire_n1_tlv3 ],
    // 254: [ "tlv4", towire_u16, fromwire_u16 ]
}
