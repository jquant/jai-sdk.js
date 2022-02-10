export enum JAIModeEnum {
    COMPLETE = 'complete',
    SIMPLE = 'simple',
    SUMMARIZED = 'summarized'
}

export enum JAIDatabaseTypeEnum {
    SELF_SUPERVISED = 'SelfSupervised',
    SUPERVISED = 'Supervised',
    IMAGE = 'Image',
    FAST_TEXT = 'FastText',
    TEXT_EDIT = 'TextEdit'
}

export enum JAIFieldType {
    TEXT = 'text',
    IMAGE = 'image_base64'
}

export enum JAIImageModelNameEnum {
    RESNET50 = 'resnet50', 
    RESNET18 = 'resnet18', 
    ALEXNET = 'alexne', 
    SQUEEZENET = 'squeezenet', 
    VGG16 = 'vgg16',
    DENSENET = 'densenet', 
    INCEPTION = 'inception', 
    GOOGLENET = 'googlenet', 
    SHUFFLENET = 'shufflenet', 
    MOBILENET = 'mobilenet', 
    RESNEXT50_32X4D = 'resnext50_32x4d', 
    WIDE_RESNET50_2 = 'wide_resnet50_2', 
    MNASNT = 'mnasnt'
}

export enum JAIImageModeEnum {
    CLASSIFIER = 'classifier',
    DENSE = 'dense',
    CONV = 'conv',
    AVGPOOL = 'avgpool',
    INT = 'int',
}