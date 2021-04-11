const toolbar = [
  [
    'Undo', 'Redo',
    '-', 'Bold', 'Italic', 'Underline',
    '-', 'Link', 'Unlink', 'Anchor', 'Format',
    '-', 'SpellChecker', 'Scayt',
    '-', 'TextColor', 'BGColor',
    '-', 'Image', 'image_embed', 'Table',
  ],
  [
    'HorizontalRule',
    '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
    '-', 'NumberedList', 'BulletedList',
    'InsertField', 'Outdent', 'Indent',
    '-', 'Blockquote', 'CreateDiv',
    '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
    '-', 'BidiLtr', 'BidiRtl',
    '-', 'Maximize', '-', 'ClonePage', '-', 'Source',
  ],
]

const SCENARIOS_FIELDS = {
  'Current Time': '{{ now:%m/%d/%Y %H:%M }}',
  'First Name': '{{ first_name }}',
  'Last Name': '{{ last_name }}',
  'User Email': '{{ to_email }}',
  'Contact Email': '{{ owner_email }}',
  Domain: '{{ domain }}',
}

export const getConfiguration = (type) => {
  if (type === 'landing') {
    return {
      allowedContent: true,
      fillEmptyBlocks: false,
      disallowedContent: 'img{width,height}',
      fullPage: true,
      uiColor: '#ebf2f6',
      removeDialogTabs: 'link:upload',
      toolbar,
      extraPlugins: 'insertfield,image_embed',
      ironscalesFields: {
        'Current Time': '{{ now:%m/%d/%Y %H:%M }}',
        'First Name': '{{ first_name }}',
        'Last Name': '{{ last_name }}',
        'User Email': '{{ to_email }}',
        'From Email': '{{ from_email }}',
        Subject: '{{ email_subject }}',
        'Email Body': '{{ email_body }}',
        'Attachment Filename': '{{ email_attachment }}',
        'Contact Email': '{{ contact_email }}',
        Domain: '{{ domain }}',
        'Start Training': '{{ start_button }}',
      },
      filebrowserUploadUrl: '/members-api/upload/',
    }
  } if (type === 'callforaction') {
    return {
      allowedContent: true,
      fillEmptyBlocks: false,
      disallowedContent: 'img{width,height}',
      fullPage: true,
      uiColor: '#ebf2f6',
      removeDialogTabs: 'link:upload',
      toolbar,
      extraPlugins: 'pagecloner,image_embed',
      ironscalesPageCloner: true,
      filebrowserUploadUrl: '/members-api/upload/',
    }
  } if (type === 'scenario') {
    return {
      allowedContent: true,
      fillEmptyBlocks: false,
      disallowedContent: 'img{width,height}',
      uiColor: '#ebf2f6',
      removeDialogTabs: 'link:upload',
      toolbar,
      extraPlugins: 'insertfield,image_embed',
      ironscalesFields: SCENARIOS_FIELDS,
      filebrowserUploadUrl: '/members-api/upload/',
    }
  } if (type === 'scenarioTextBody') {
    return {
      allowedContent: true,
      fillEmptyBlocks: false,
      disallowedContent: 'img{width,height}',
      fullPage: true,
      enterMode: 2,
      uiColor: '#ebf2f6',
      removeDialogTabs: 'link:upload',
      toolbar: [
        [
          'Undo', 'Redo',
          '-', 'SpellChecker', 'Scayt',
        ],
        [
          '-', 'Cut', 'Copy', 'Paste',
          '-', 'Maximize',
        ],
        [
          'InsertField',
        ],
      ],
      extraPlugins: 'insertfield,image_embed',
      ironscalesFields: SCENARIOS_FIELDS,
    }
  }
  return {
    allowedContent: true,
    fillEmptyBlocks: false,
    toolbar: [
      { name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'] },
      { name: 'basicstyles', items: ['Bold', 'Italic'] },
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'paragraph', items: ['JustifyLeft', 'JustifyRight'] },
    ],
    uiColor: '#ebf2f6',
  }
}
