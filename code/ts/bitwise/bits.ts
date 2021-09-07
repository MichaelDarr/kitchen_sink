import {
    Add,
    GreaterThanOrEqual,
    Subtract,
} from './number';
import { TupleOf } from './tuple';

export type Bit = 1|0;
export type Bits = Bit[];

export type PowerOfTwo<N extends Bits> =
    N extends 0[]
        ? 1
        : PowerOfTwo<SubtractBits<N, [0, 0, 0, 1]>> extends infer U
            ? U extends number
                ? Add<U, U>
                : never
            : never;

export type UIntVal<N extends number, S extends Bits, B extends Bits=[]> =
    GreaterThanOrEqual<N, PowerOfTwo<S>> extends true
        ? S extends 0[]
            ? [...B, 1]
            : UIntVal<Subtract<N, PowerOfTwo<S>>, SubtractBits<S, [0, 0, 0, 1]>, [...B, 1]>
        : S extends 0[]
            ? [...B, 0]
            : UIntVal<N, SubtractBits<S, [0, 0, 0, 1]>, [...B, 0]>;

export type Buffer<A extends Bit> =
    A extends A
        ? A
        : never;

export type Not<A extends Bit> =
    A extends 1
        ? 0
        : 1;

export type And<A extends Bit, B extends Bit> =
    A extends 1
        ? Buffer<B>
        : 0;

export type Or<A extends Bit, B extends Bit> =
    A extends 1
        ? 1
        : Buffer<B>;

export type Nand<A extends Bit, B extends Bit> =
    A extends 1
        ? Not<B>
        : 1;

export type Nor<A extends Bit, B extends Bit> =
    A extends 1
        ? 0
        : Not<B>;

export type Xor<A extends Bit, B extends Bit> =
    A extends 1
        ? Not<B>
        : B;

export type Xnor<A extends Bit, B extends Bit> =
    A extends 1
        ? Buffer<B>
        : Not<B>;

export type XorBits<A extends Bits, B extends Bits, Res extends Bits=[]> =
    A extends [A[0], ...infer ABits]
        ? ABits extends Bits
            ? B extends [B[0], ...infer BBits]
                ? BBits extends Bits
                    ? XorBits<ABits, BBits, [...Res, Xor<A[0], B[0]>]>
                    : never
                : Res
            : never
        : Res;

export type AndBits<A extends Bits, B extends Bits, Res extends Bits=[]> =
    A extends [A[0], ...infer ABits]
        ? ABits extends Bits
            ? B extends [B[0], ...infer BBits]
                ? BBits extends Bits
                    ? AndBits<ABits, BBits, [...Res, And<A[0], B[0]>]>
                    : never
                : Res
            : never
        : Res;

export type NotBits<X extends Bits, Res extends Bits=[]> =
    X extends [X[0], ...infer XBits]
        ? XBits extends Bits
            ? NotBits<XBits, [...Res, Not<X[0]>]>
            : never
        : Res;

export type LeftShiftBits<B extends Bits> =
    B extends [B[0], ...infer Bits]
        ? [...Bits, 0]
        : [];

// export type RightShiftBits<B extends Bits> =
//     B extends [...infer Bits, B[Subtract<B['length'], 1>]]
//         ? [0, ...Bits]
//         : [];

export type AddBits<A extends Bits, B extends Bits> =
    LeftShiftBits<AndBits<A, B>> extends infer Keep
        ? Keep extends Bits
            ? XorBits<A, B> extends infer Carry
                ? Carry extends Bits
                    ? Keep extends 0[]
                        ? Carry
                        : AddBits<Keep, Carry>
                    : never
                : never
            : never
        : never;

export type SubtractBits<X extends Bits, Y extends Bits> =
    Y extends 0[]
        ? X
        : XorBits<X, Y> extends infer Keep
            ? Keep extends Bits
                ? LeftShiftBits<AndBits<NotBits<X>, Y>> extends infer Carry
                    ? Carry extends Bits
                        ? SubtractBits<Keep, Carry>
                        : never
                    : never
                : never
            : never;

export type UInt8 = TupleOf<Bit, 8>;
export type UInt16 = TupleOf<Bit, 16>;
export type UInt32 = TupleOf<Bit, 32>;
export type UInt64 = TupleOf<Bit, 64>;

export type UInt8Val<N extends number> = UIntVal<N, [0, 1, 1 ,1]>;

export type Zero = UInt8Val<0>;
export type One = UInt8Val<1>;
export type Two = UInt8Val<2>;
export type Three = UInt8Val<3>;
export type Four = UInt8Val<4>;
export type Five = UInt8Val<5>;
export type Six = UInt8Val<6>;
export type Seven = UInt8Val<7>;
export type Eight = UInt8Val<8>;
export type Nine = UInt8Val<9>;
export type Ten = UInt8Val<10>;
export type Eleven = UInt8Val<11>;
export type Twelve = UInt8Val<12>;
export type Thirteen = UInt8Val<13>;
export type Fourteen = UInt8Val<14>;
export type Fifteen = UInt8Val<15>;
export type TwoFiftyFive = UInt8Val<255>;

export type XorOneTwoAlt = XorBits<Five, Two>;
export type ShiftedLeft = LeftShiftBits<TwoFiftyFive>;
export type ShiftedRight = RightShiftBits<TwoFiftyFive>;
export type AddedBits = AddBits<Three, Three>;
export type SubtractedBits = SubtractBits<Five, Three>;
