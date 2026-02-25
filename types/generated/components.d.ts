import type { Schema, Struct } from '@strapi/strapi';

export interface IndustryAnalysisPackage extends Struct.ComponentSchema {
  collectionName: 'components_industry_analysis_packages';
  info: {
    displayName: 'Analysis Package';
    icon: 'flask';
  };
  attributes: {
    analyses: Schema.Attribute.Component<'shared.bullet-item', true>;
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price_with_rec: Schema.Attribute.String;
    price_without_rec: Schema.Attribute.String;
    sample_size: Schema.Attribute.String;
    section: Schema.Attribute.String;
    turnaround_time: Schema.Attribute.String;
  };
}

export interface IndustryTableSection extends Struct.ComponentSchema {
  collectionName: 'components_industry_table_sections';
  info: {
    displayName: 'Table Section';
    icon: 'table';
  };
  attributes: {
    title: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    content: Schema.Attribute.RichText;
  };
}

export interface SharedBulletItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_bullet_items';
  info: {
    displayName: 'Bullet Item';
    icon: 'list';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_ctas';
  info: {
    displayName: 'Contact CTA';
    icon: 'phone';
  };
  attributes: {
    button_label: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
  };
}

export interface SharedFileLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_file_links';
  info: {
    displayName: 'File Link';
    icon: 'file-pdf';
  };
  attributes: {
    external_url: Schema.Attribute.String;
    file: Schema.Attribute.Media<'files' | 'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tag';
    icon: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'industry.analysis-package': IndustryAnalysisPackage;
      'industry.table-section': IndustryTableSection;
      'shared.bullet-item': SharedBulletItem;
      'shared.contact-cta': SharedContactCta;
      'shared.file-link': SharedFileLink;
      'shared.tag': SharedTag;
    }
  }
}
