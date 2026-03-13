import { Document, Types } from 'mongoose';
export type ApiTestDocument = ApiTest & Document;
export declare class ApiTest {
    userId: Types.ObjectId;
    url: string;
    method: string;
    headers: Record<string, string>;
    body: any;
    status: number;
    responseSnippet: string;
}
export declare const ApiTestSchema: import("mongoose").Schema<ApiTest, import("mongoose").Model<ApiTest, any, any, any, (Document<unknown, any, ApiTest, any, import("mongoose").DefaultSchemaOptions> & ApiTest & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, ApiTest, any, import("mongoose").DefaultSchemaOptions> & ApiTest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, ApiTest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApiTest, Document<unknown, {}, ApiTest, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    url?: import("mongoose").SchemaDefinitionProperty<string, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    method?: import("mongoose").SchemaDefinitionProperty<string, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    headers?: import("mongoose").SchemaDefinitionProperty<Record<string, string>, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    body?: import("mongoose").SchemaDefinitionProperty<any, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<number, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    responseSnippet?: import("mongoose").SchemaDefinitionProperty<string, ApiTest, Document<unknown, {}, ApiTest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ApiTest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ApiTest>;
